using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace API.Helper
{
    public class Validate
    {
        public static readonly string EmailValidation_Regex = @"^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

        public static readonly Regex EmailValidation_Regex_Compiled = new Regex(EmailValidation_Regex, RegexOptions.IgnoreCase);

        public static readonly string EmailValidation_Regex_JS = $"/{EmailValidation_Regex}/";
        public static bool IsValidEmailAddress(string email, bool useRegEx = false, bool requireDotInDomainName = false)
        {
            var isValid = useRegEx
                // see RegEx comments
                ? !string.IsNullOrEmpty(email) && EmailValidation_Regex_Compiled.IsMatch(email)

                // ref.: https://stackoverflow.com/a/33931538/1233379
                : new EmailAddressAttribute().IsValid(email);

            if (isValid && requireDotInDomainName)
            {
                var arr = email.Split('@', StringSplitOptions.RemoveEmptyEntries);
                isValid = arr.Length == 2 && arr[1].Contains(".");
            }
            return isValid;
        }
        public static bool IsValidatePhone(string phone)
        {
            var phoneRegex = new Regex(@"(0[1-9]{1})+([0-9]{8})\b");
            var flag = phoneRegex.IsMatch(phone);
            return flag;
        }
    }
}
