using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string? Introduction { get; set; }
        public string? LookingFor { get; set; }
        public string? Interests { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public ICollection<Photo>? Photos { get; set; } = new List<Photo>();
        public ICollection<Like>? Likers { get; set; } = new List<Like>();
        public ICollection<Like>? Likees { get; set; } = new List<Like>();
        public ICollection<Message>? MessagesSent { get; set; } = new List<Message>();
        public ICollection<Message>? MessagesReceived { get; set; } = new List<Message>();

    }
}