using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AbleNotes.Models
{
    public class ApplicationUser : IdentityUser
    {
        [JsonIgnore]
        public virtual ICollection<Note> Notes { get; set; }
    }
}