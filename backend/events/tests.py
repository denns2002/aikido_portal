from rest_framework.reverse import reverse_lazy
from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from events.models.event import Event, EventsDate, EventsTime
from profile.models.profile import Profile


class EventTests(APITestCase):
    # region data test
    event_correct = {'name': 'testevent1',
                     'reg_start': '2023-04-02',
                     'reg_end': '2023-04-08',
                     'about': 'text about',
                     'events_dates': [{'date': '2023-04-10', 'comment': 'date 1',
                                       'eventstime_set': [
                                           {'name': 'mini event 1 date 1', 'time_start': '00:00:00',
                                            'time_end': '08:00:00'},
                                           {'name': 'mini enene 2 date 1', 'time_start': '10:00:00',
                                            'time_end': '12:00'}]},
                                      {'date': '2023-05-15', 'comment': 'date 2',
                                       'eventstime_set': [
                                           {'name': 'mini event 1 date 2', 'time_start': '00:00:00',
                                            'time_end': '08:00:00'},
                                           {'name': 'mini event 2 date 2', 'time_start': '10:00:00',
                                            'time_end': '12:00'}]}
                                      ]}

    event_new = {'name': 'new name',
                 'reg_start': '2022-06-12',
                 'reg_end': '2022-06-13',
                 'about': 'new info',
                 'events_dates': [{'date': '2022-07-10', 'comment': 'new info',
                                   'eventstime_set': [
                                       {'id': 2, 'name': 'new somename1', 'time_start': '13:00:00',
                                        'time_end': '04:00:00'},
                                       {'id': 3, 'name': 'new somename2', 'time_start': '11:00:00',
                                        'time_end': '16:00:00'}
                                   ]}]}

    event_incorrect = {'name': 'testevent2',
                       'reg_start': '2023-04-35',
                       'reg_end': '2023-19-02',
                       'about': 'text about'}

    events_date_time_reverse = [{'date': '2023-04-22', 'comment': 'info',
                                 'eventstime_set': [
                                     {'name': 'somename', 'time_start': '08:00:00', 'time_end': '01:00:00'}]}]

    events_date_bad_data = [{'date': '2023-04-22', 'comment': 'info',
                             'eventstime_set': [{'name': 'somename', 'time_start': 'string', 'time_end': 'string'}]}]

    # endregion

    def setUp(cls):
        event1 = Event.objects.create(name='event1', reg_start='2022-08-12', reg_end='2022-08-19', about='info')
        events_date1 = EventsDate.objects.create(date='2022-08-20', comment='info', event=event1)
        EventsTime.objects.create(name='mini event1', time_start='10:00', time_end='12:00',
                                  events_date=events_date1)

        event2 = Event.objects.create(name='event2', reg_start='2023-06-08', reg_end='2023-06-10', about='info')
        events_date2 = EventsDate.objects.create(date='2023-06-12', comment='info', event=event2)
        EventsTime.objects.create(name='mini event2-1', time_start='10:00', time_end='12:00',
                                  events_date=events_date2)
        EventsTime.objects.create(name='mini event2-2', time_start='14:00', time_end='18:00',
                                  events_date=events_date2)

    # region event_list
    def test_get_list_event(self):
        client = APIClient()
        response = client.get(reverse_lazy('event-list'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['count'] == 2)

    def test_create_event_correct(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': EventTests.event_correct['reg_start'],
                                'reg_end': EventTests.event_correct['reg_end'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.event_correct['events_dates']},
                               format='json')
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Event.objects.filter(slug=response.data['slug']).first() is not None)

    def test_create_event_without_required_field(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                # 'reg_start': EventTests.event1['reg_start'],
                                'reg_end': EventTests.event_correct['reg_end'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.event_correct['events_dates']},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_event_reg_data_reverse(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': EventTests.event_correct['reg_end'],
                                'reg_end': EventTests.event_correct['reg_start'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.event_correct['events_dates']},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_event_time_reverse(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': EventTests.event_correct['reg_start'],
                                'reg_end': EventTests.event_correct['reg_end'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.events_date_time_reverse},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_event_bad_date(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': EventTests.event_incorrect['reg_start'],
                                'reg_end': EventTests.event_incorrect['reg_end'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.event_correct['events_dates']},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_event_bad_data(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': EventTests.event_correct['reg_start'],
                                'reg_end': EventTests.event_correct['reg_end'],
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.events_date_bad_data},
                               format='json')
        self.assertEqual(response.status_code, 400)

    def test_create_event_date_after_reg_end(self):
        client = APIClient()
        response = client.post(reverse_lazy('event-list'),
                               {'name': EventTests.event_correct['name'],
                                'reg_start': '1917-03-08',
                                'reg_end': '1917-06-16',
                                'about': EventTests.event_correct['about'],
                                'events_dates': EventTests.event_correct['events_dates']},
                               format='json')
        self.assertEqual(response.status_code, 400)

    # endregion

    # region event-detail
    def test_event_detail_get(self):
        event = Event.objects.all()[0]
        client = APIClient()
        response = client.get(reverse_lazy('event-detail', kwargs={'slug': event.slug}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['slug'], event.slug)

    def test_event_detail_update_correct(self):
        event = Event.objects.filter(name='event2').first()
        client = APIClient()
        response = client.patch(reverse_lazy('event-detail', kwargs={'slug': event.slug}), EventTests.event_new,
                                format='json')
        print(response.data, response.status_code)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], EventTests.event_new['name'])
        self.assertEqual(response.data['reg_start'], EventTests.event_new['reg_start'])
        self.assertEqual(response.data['reg_end'], EventTests.event_new['reg_end'])
        self.assertEqual(response.data['about'], EventTests.event_new['about'])
        self.assertEqual(response.data['events_dates'][0]['date'], EventTests.event_new['events_dates'][0]['date'])
        self.assertEqual(response.data['events_dates'][0]['comment'],
                         EventTests.event_new['events_dates'][0]['comment'])

        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][0]['name'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][0]['name'])
        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][0]['time_end'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][0]['time_end'])
        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][0]['time_start'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][0]['time_start'])

        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][1]['name'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][1]['name'])
        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][1]['time_end'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][1]['time_end'])
        self.assertEqual(response.data['events_dates'][0]['eventstime_set'][1]['time_start'],
                         EventTests.event_new['events_dates'][0]['eventstime_set'][1]['time_start'])

    def test_event_detail_delete(self):
        event = Event.objects.all()[0]
        client = APIClient()
        response = client.delete(reverse_lazy('event-detail', kwargs={'slug': event.slug}))
        self.assertEqual(response.status_code, 204)
        self.assertTrue(Event.objects.filter(slug=event.slug).first() is None)

    def test_event_detail_delete_bad_slug(self):
        event = Event.objects.all()[0]
        client = APIClient()
        response = client.delete(reverse_lazy('event-detail', kwargs={'slug': event.slug[-2]}))
        self.assertEqual(response.status_code, 404)
        self.assertTrue(Event.objects.filter(slug=event.slug).first() is not None)

    # endregion

    #  its test for new backend
    def test_event_change_org_and_change_co_org(self):
        profile1 = Profile.objects.create(first_name='first_name1', last_name='last_name1', mid_name='mid_name1')
        profile2 = Profile.objects.create(first_name='first_name2', last_name='last_name2', mid_name='mid_name2')
        profile3 = Profile.objects.create(first_name='first_name3', last_name='last_name3', mid_name='mid_name3')

        event = Event.objects.all()[0]
        client = APIClient()
        response = client.patch(reverse_lazy('event-add-org', kwargs={'slug': event.slug}),
                                {'organizers': [profile1.slug, profile2.slug]}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(profile1.slug in event.organizers and profile2.slug in event.organizers)

        response = client.patch(reverse_lazy('event-add-co-org', kwargs={'slug': event.slug}),
                                {'co_organizers': [profile2.slug, profile3.slug]}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(profile2.slug in event.co_organizers and profile3.slug in event.co_organizers)
