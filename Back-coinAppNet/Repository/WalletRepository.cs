using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace Back_coinAppNet.Repository
{
    public class WalletRepository : IWallet
    {
        private readonly IConfiguration _configuration;

        public WalletRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GetHistorywallet(int iduser)
        {
            string json_data = "";
            try
            {

                using (SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.finanzasHistorySelProc", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Userid", iduser));
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                json_data = reader["json_data"].ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }

            return json_data;
        }

        public string Getwallet(WalletDTO walletDto)
        {
            string json_data = "";
            try
            {

                using (SqlConnection conn= new SqlConnection(_configuration.GetConnectionString("DefaultSQLConnection")))
                {
                    conn.Open();
                    SqlCommand cmd = new SqlCommand("dbo.finanzasSelProc", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@fecha", walletDto.date));
                    cmd.Parameters.Add(new SqlParameter("@Userid", walletDto.id));
                    using (var reader = cmd.ExecuteReader())
                    {
                        if(reader.HasRows )
                        {
                            while(reader.Read())
                            {                            
                                json_data = reader["json_data"].ToString();
                            }
                        }
                    }
                }
            }catch(Exception ex)
            {

            }

            return json_data;
        }
    }
}
