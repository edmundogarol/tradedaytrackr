import requests


def fetch_usd_conversion_rate(target_currency: str) -> float:
    if target_currency == "USD":
        return 1.0

    url = f"https://api.frankfurter.app/latest?from=USD&to={target_currency}"
    response = requests.get(url, timeout=5)

    if response.status_code != 200:
        raise Exception("Failed to fetch exchange rate")

    data = response.json()

    return data["rates"][target_currency]
