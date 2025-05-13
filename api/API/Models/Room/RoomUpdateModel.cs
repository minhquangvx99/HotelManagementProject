namespace API.Models.Room
{
    public class RoomUpdateModel
    {
        public int RoomId { get; set; }
        public int UserID { get; set; }
        public int Status { get; set; }
        public int TypeOfTopicSetID { get; set; }
        public int NumberOfQuestion { get; set; }
        public int[][] QuestionAndObligatoryIds { get; set; }
        public int[][] QuestionCompositeAndObligatoryIds { get; set; }
        public int ExamTypeID { get; set; }
        public string? Name { get; set; }
    }
}
