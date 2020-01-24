using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace AbleNotes.Models
{
     public class Note
     {
          [Key]
          [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
          public int Id { get; set; }
          [Required]
          [MaxLength(100)]
          public string Title { get; set; }
          
          [MaxLength(10000)]
          public string Text { get; set; }

          public virtual ApplicationUser Owner { get; set; }
     }
}