using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Room
{
    public class RoomGetModel
    {
        public int TopicSetID { get; set; }
        public string ExamType { get; set; }
        public string Name { get; set; }
        public int ExamCode { get; set; }
        public string TypeOfTopicSet { get; set; }
        public string Code { get; set; }
        public string Admin { get; set; }
        public int Status { get; set; }
        public string NumberOfQuestion { get; set; }
    }
}