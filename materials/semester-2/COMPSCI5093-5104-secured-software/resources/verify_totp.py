import pyotp

def verify_totp(secret):
    # Create a TOTP object
    totp = pyotp.TOTP(secret)

    # Get the TOTP from the user
    user_totp = input("Enter your TOTP: ")

    # Verify the TOTP
    if totp.verify(user_totp):
        print("TOTP is valid!")
    else:
        print("Invalid TOTP.")

if __name__ == "__main__":
    # secret_key = input("Enter your secret key: ")
    secret_key = "M6MX4TV2S4PMQYASP2DYUPS2UAG7O4UW"
    verify_totp(secret_key)
