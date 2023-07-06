import { useParams } from "react-router-dom";
import { useGetClubBySlugQuery } from "../../store/apis";
import { IClub, IInputAttributes } from "../../store/types";
import { useState } from "react";
import Input from "../forms/Input";
import TextArea from "../forms/TextArea";

function EditClub() {
    const {slug} = useParams()

    const {data: club, isLoading} = useGetClubBySlugQuery(slug? slug : "")
    console.log(club)

    const [inputsValues, setInputValues] = useState<IClub>(
        club ? club : {
            id: 0,
            name: "",
            info: "",
            slug:"",
            is_active: false,
            addresses: [],
            groups: [],
            photos: []
        }
    )
    const [touched, setTouched] = useState({
		id: false,
        name: false,
        info: false,
        slug:false,
        is_active: false,
        addresses: false,
        groups: false,
        photos: false
	})

    const formInputs: IInputAttributes[] = [
        {
            label: "Название",
			type: "text",
			placeholder: "name",
			name: "name",
			value: inputsValues.name,
			required: true,
			touched: touched.name,
        },
        {
            label: "Информация",
			type: "text",
			placeholder: "info",
			name: "info",
			value: inputsValues.info,
			required: true,
			touched: touched.info,
        }
    ]

    const [settings, setSettings] = useState(
        club ? {
            is_active: club.is_active,
            addresses: club.addresses,
            groups: club.groups,
            photos: club.photos
        }
        : {
            is_active: false,
            addresses: [],
            groups: [],
            photos: []
        }
    )

    function handleChange() {

    }
    
    return ( 
        <div className="relative flex h-full w-full">
            <div className="z-5 border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 mx-auto flex flex-col items-center rounded-xl px-8 py-7">
                <label className="font-bold text-2xl">
					Редактировать клуб
				</label>
                <form
					className="flex flex-col gap-2 mt-6 w-[30rem]"
					// onSubmit={handleSubmit}
				>
                    <Input 
                        {...formInputs[0]}
                        onChange={handleChange}
                    />
                    <TextArea 
                        {...formInputs[1]}
                        onChange={handleChange}
                    />
                    <button
                        className={`${
                            settings.is_active
                                ? "bg-green-500 hover:bg-green-300"
                                : "bg-slate-500 hover:bg-slate-300"
                        } flex-1 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200`}
                        type="button"
                        onClick={() => {}}
                    >
                        Клуб активен
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditClub;