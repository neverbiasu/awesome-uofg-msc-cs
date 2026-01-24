import pyotp
import qrcode


def generate_qr_code():
    # Generate a random secret key
    #secret = pyotp.random_base32()
    secret = "M6MX4TV2S4PMQYASP2DYUPS2UAG7O4UW"

    # User's identifying information
    user_identifier = "user@sse.com"
    service_provider = "SSE"

    # Generate a URI for Google Authenticator
    uri = pyotp.totp.TOTP(secret).provisioning_uri(user_identifier, issuer_name=service_provider)

    # Generate and display the QR code
    qr_img = qrcode.make(uri)
    qr_img.show()

    return uri


if __name__ == "__main__":
    secret_key = generate_qr_code()
    print(f"Your secret key is: {secret_key}")
