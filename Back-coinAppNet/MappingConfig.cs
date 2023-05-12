using AutoMapper;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;

namespace Back_coinAppNet
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            CreateMap<Bill, BillDTO>();
            CreateMap<BillDTO, Bill>();

            CreateMap<Income, IncomeDTO>();
            CreateMap<IncomeDTO, Income>();

            CreateMap<Holding, HoldingDTO>();
            CreateMap<HoldingDTO, Holding>();
        }
    }
}
