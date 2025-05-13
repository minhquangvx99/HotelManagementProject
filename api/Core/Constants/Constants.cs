using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Core.Constants
{
    public class Constants
    {
        public const string DateTimeFormat = "dd/MM/yyyy";

        public enum GenderType
        {
            [Description("Nam")]
            MALE = 1,
            [Description("Nữ")]
            FEMALE = 2,
        }

        public enum Status
        {
            [Description("Inactive")]
            Inactive = 0,
            [Description("Active")]
            Active = 1,
            [Description("Lock")]
            Lock = 2,
        }
    }
}
