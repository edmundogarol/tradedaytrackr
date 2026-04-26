from rest_framework.response import Response
from rest_framework.views import APIView

from backend.djangoapi.services.reports.reports_service import ReportService


class ReportView(APIView):
    def get(self, request):
        service = ReportService(request.user, request.query_params)
        data = service.generate()
        return Response(data)
