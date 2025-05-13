using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace Core.Helper.Extensions
{
    public static class ExtendedMethod
    {
        public static string RejectMarks(this string text, int maxLength = 100)
        {
            if (String.IsNullOrEmpty(text))
            {
                return String.Empty;
            }
            text = text.Trim();
            text = text.ToLower();
            string[] pattern = new string[7];
            pattern[0] = "a|(á|ả|à|ạ|ã|ă|ắ|ẳ|ằ|ặ|ẵ|â|ấ|ẩ|ầ|ậ|ẫ)";
            pattern[1] = "o|(ó|ỏ|ò|ọ|õ|ô|ố|ổ|ồ|ộ|ỗ|ơ|ớ|ở|ờ|ợ|ỡ)";
            pattern[2] = "e|(é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ)";
            pattern[3] = "u|(ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ử|ự|ữ)";
            pattern[4] = "i|(í|ì|ỉ|ị|ĩ)";
            pattern[5] = "y|(ý|ỳ|ỷ|ỵ|ỹ)";
            pattern[6] = "d|đ";
            for (int i = 0; i < pattern.Length; i++)
            {
                char replaceChar = pattern[i][0];
                MatchCollection matchs = Regex.Matches(text, pattern[i]);
                foreach (Match m in matchs)
                {
                    text = text.Replace(m.Value[0], replaceChar);
                }
            }
            // remove entities
            //text = Regex.Replace(text, @"&\w+;", "");
            //// remove anything that is not letters, numbers, dash, or space
            ////text = Regex.Replace(text, @"[^a-z0-9\-\s]", "");
            //// replace spaces
            //text = text.Replace(".", "");
            //text = text.Replace(":", "");
            //text = text.Replace("+", "");
            //text = text.Replace("/", "");
            //text = text.Replace(@"\", "");
            //text = text.Replace(' ', '-');
            //text = text.Replace("(", "");
            //text = text.Replace(")", "");
            //// collapse dashes
            //text = Regex.Replace(text, @"-{2,}", "-");
            //// trim excessive dashes at the beginning
            //text = text.TrimStart(new[] { '-' });
            //// remove trailing dashes
            //text = text.TrimEnd(new[] { '-' });
            //return text;

            var match = Regex.Match(text.ToLower(), "[\\w]+");
            StringBuilder result = new StringBuilder("");
            bool maxLengthHit = false;
            while (match.Success && !maxLengthHit)
            {
                if (result.Length + match.Value.Length <= maxLength)
                {
                    result.Append(match.Value + "-");
                }
                else
                {
                    maxLengthHit = true;
                    // Handle a situation where there is only one word and it is greater than the max length.
                    if (result.Length == 0) result.Append(match.Value.Substring(0, maxLength));
                }
                match = match.NextMatch();
            }
            // Remove trailing '-'
            if (result[result.Length - 1] == '-') result.Remove(result.Length - 1, 1);
            return result.ToString();
        }

        #region Enum
        public static T GetAttrEnum<T>(this Enum value)
        {
            try
            {

                // Get the type
                Type type = value.GetType();

                // Get fieldinfo for this type
                FieldInfo fieldInfo = type.GetField(value.ToString());

                //// Get the stringvalue attributes
                T[] attribs = fieldInfo.GetCustomAttributes(
                    typeof(T), false) as T[];

                //// Return the first if there was a match.
                return attribs[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string GetDescription(this Enum value)
        {
            try
            {

                // Get the type
                Type type = value.GetType();

                // Get fieldinfo for this type
                FieldInfo fieldInfo = type.GetField(value.ToString());

                //// Get the stringvalue attributes
                DescriptionAttribute[] attribs = fieldInfo.GetCustomAttributes(
                    typeof(DescriptionAttribute), false) as DescriptionAttribute[];

                //// Return the first if there was a match.
                return attribs.Length > 0 ? attribs[0].Description : value.ToString();
            }
            catch (Exception)
            {
                return "";
            }
        }
        public static Dictionary<int, string> EnumToDictionary(this Type type)
        {
            //Type type = _enum.GetType();
            var _return = new Dictionary<int, string>();
            try
            {
                foreach (object item in Enum.GetValues(type))
                {
                    _return.Add(((int)item), GetDescription((Enum)item));
                }

            }
            catch (Exception ex)
            {

            }
            return _return;

        }
        public static Dictionary<int, T> EnumToDictionary<T>(this Type type)
        {
            var _return = new Dictionary<int, T>();
            try
            {
                foreach (object item in Enum.GetValues(type))
                {
                    _return.Add(((int)item), GetAttrEnum<T>((Enum)item));
                }

            }
            catch (Exception ex)
            {

            }
            return _return;

        }
        #endregion
    }
}
