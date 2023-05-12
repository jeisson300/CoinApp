﻿using System.ComponentModel.DataAnnotations;

namespace Back_coinAppNet.Models.Dto
{
    public class IncomeDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Value { get; set; }
        [Required]
        public DateTime Date { get; set; }

        public int UserId { get; set; }
    }
}
