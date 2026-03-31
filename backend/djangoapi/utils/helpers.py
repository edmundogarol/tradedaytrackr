import json


class RequestPayload:
    def __init__(self, request):
        self._payload = json.loads(request.body)

    def get(self, *keys, default=None):
        data = self._payload
        for key in keys:
            if not isinstance(data, dict):
                return default
            data = data.get(key)
            if data is None:
                return default
        return data
