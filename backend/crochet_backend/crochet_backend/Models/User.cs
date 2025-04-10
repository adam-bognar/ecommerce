using Microsoft.AspNetCore.Identity;

namespace crochet_backend.Models
{
    public partial class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
        public virtual Cart Cart { get; set; }
    }
}
