namespace API.Models.Room
{
    public class RoomCreateModel
    {
        public string TopicSetCode { get; set; }
        public string Name { get; set; }
        public int UserID { get; set; }
        public int Status { get; set; }
        public int ExamTypeID { get; set; }
        public int TypeOfTopicSetID { get; set; }
        public int[][] QuestionAndObligatoryIds { get; set; }
        public int[][] QuestionCompositeAndObligatoryIds { get; set; }

    }
}
