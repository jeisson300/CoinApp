using AutoMapper;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_coinAppNet.Controllers
{
    [Route("api/income")]
    [ApiController]
    public class IncomeController : ControllerBase
    {

        private readonly IIncome _income;
        private readonly IMapper _mapper;
        public IncomeController(IIncome income , IMapper mapper)
        {
            _income = income;
            _mapper = mapper;
        }

        [Authorize]
        //[Authorize(Roles="admin")]
        [HttpPost]
        public async Task<IActionResult> CreateIncome([FromBody] IncomeDTO incomeDTO)
        {
            bool resp = false;
            try
            {
                incomeDTO.Date = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm"));
                Income income = _mapper.Map<Income>(incomeDTO);
                await _income.CreateAsync(income);
                resp = true;
            }
            catch (Exception ex)
            {

            }
            return Ok(new { status = resp });
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Income>> UpdateIncome([FromBody] IncomeDTO incomeDTO, int id)
        {
            Income income = new();
            try
            {
                if (incomeDTO == null || id != incomeDTO.Id)
                {
                    return BadRequest();
                }                
                income = _mapper.Map<Income>(incomeDTO);
                income = await _income.UpdateAsync(income);
            }
            catch (Exception ex)
            {

            }
            return income;
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            Income income = await _income.GetAsync(x => x.Id == id);
            bool resp = false;
            try
            {
                if (income == null)
                {
                    ModelState.AddModelError("CustomeError", "Income don't exists");
                    return BadRequest(ModelState);
                }
                await _income.DeleteAsync(income);
                resp = true;
            }
            catch (Exception ex)
            {

            }
            return Ok(new {status =  resp });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Income>>> GetAllIncomes ()
        {
            return await _income.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Income>> GetIncome(int id)
        {
            return  await _income.GetAsync(x => x.Id == id);
        }
    }
}
