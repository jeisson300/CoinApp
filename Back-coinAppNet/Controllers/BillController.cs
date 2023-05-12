using AutoMapper;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_coinAppNet.Controllers
{
    [Route("api/bill")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBill _bill;
        private readonly IMapper _mapper;
        public BillController(IBill bill, IMapper mapper)
        {
            _bill = bill;
            _mapper = mapper;
        }

        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateBill([FromBody] BillDTO billDTO)
        {
            bool resp = false;
            try
            {
                billDTO.Date = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm"));
                Bill bill = _mapper.Map<Bill>(billDTO);
                await _bill.CreateAsync(bill);
                resp = true;
            }
            catch (Exception ex)
            {
                resp = false;
            }

            return Ok(new { status = resp });
        }

        [HttpPut("{id:int}", Name ="Update Bill")]
        [Authorize]
        public async Task<ActionResult<Bill>> UpdateBill(int id, [FromBody] BillDTO billDTO)
        {
            Bill bill = new();
            try
            {
                if (billDTO == null || id != billDTO.Id)
                {
                    return BadRequest();
                }
                bill = _mapper.Map<Bill>(billDTO);                
                bill = await _bill.UpdateAsync(bill);
            }
            catch (Exception ex)
            {

            }
            return bill;
        }
        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteBill(int id)
        {
            bool resp = false ;
            try
            {
                Bill bill = await _bill.GetAsync(x => x.Id == id);
                if (bill == null)
                {
                    ModelState.AddModelError("Custom Error", "Bill don't exists");
                    return BadRequest(ModelState);
                }
                await _bill.DeleteAsync(bill);
                resp  = true;
            }
            catch (Exception ex)
            {
                resp = false;
            }
            return Ok(new { status = resp });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Bill>>> GetAllBill()
        {           
            return await _bill.GetAllAsync();
        }


        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            return await _bill.GetAsync(x => x.Id == id);
        }
    }
}
