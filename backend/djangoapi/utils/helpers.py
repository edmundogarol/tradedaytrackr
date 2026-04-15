import json
import uuid


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


def upload_to(instance, filename):
    ext = filename.split(".")[-1]
    return f"temp/{uuid.uuid4()}.{ext}"


def trading_account_templates_upload_to(instance, filename):
    ext = filename.split(".")[-1]
    return f"trading_account_templates/{uuid.uuid4()}.{ext}"


def journal_entries_upload_to(instance, filename):
    ext = filename.split(".")[-1]
    return f"journal_entries/{uuid.uuid4()}.{ext}"
