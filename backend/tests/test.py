import unittest
import sys
import io
import os

# sys.path.append(os.path.abspath("../.."))

import app  # noqa


class TestAPI(unittest.TestCase):
    def setUp(self):
        print('Start Test About Status Code')
        app.app.config['TESTING'] = True
        self.client = app.app.test_client()

        with open('tests/img/img.txt') as f:
            base64_img = f.read()

        self.test_data = [
            ('mayu', {'file': base64_img}, 200),
            ('mayu', {'file': 'aaa'}, 400),
            ('mayu', {'file': 111}, 400),
            ('mayu', {}, 400),
            ('nose', {'file': base64_img}, 200),
            ('lip', {'file': base64_img, 'lip': 'normal'}, 200),
            ('cheak', {'file': base64_img}, 200),
        ]

    def tearDown(self):
        print('End Test')

    def test_status_code(self):
        for endpoints, req_data, status_code in self.test_data:
            with self.subTest(endpoints=endpoints, req_data=req_data, status_code=status_code):
                print('[POST] /{}, code={}'.format(endpoints, status_code))
                res = self.client.post('/{}'.format(endpoints), json=req_data)
                self.assertEqual(res.status_code, status_code)


if __name__ == '__main__':
    unittest.main()
