﻿namespace crochet_backend.Models
{
    public partial class ProductTag
    {
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public int TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }

}
