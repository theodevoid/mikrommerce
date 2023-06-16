export function serializePhoneNumber(phoneNumber: string) {
  // Remove all non-digit characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, "");

  // Check if the phone number starts with '+62', '0', or '8'
  if (phoneNumber.startsWith("+62")) {
    // Remove the '+' sign
    phoneNumber = phoneNumber.substring(1);
  } else if (phoneNumber.startsWith("0")) {
    // Replace the leading '0' with '+62'
    phoneNumber = "62" + phoneNumber.substring(1);
  } else if (phoneNumber.startsWith("8")) {
    // Add '+62' as prefix for local mobile numbers
    phoneNumber = "62" + phoneNumber;
  }

  // Return the serialized phone number
  return phoneNumber;
}
