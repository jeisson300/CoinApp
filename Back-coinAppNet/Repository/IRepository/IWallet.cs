using Back_coinAppNet.Models.Dto;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IWallet
    {
        public string  Getwallet(WalletDTO walletDto);


        public string GetHistorywallet(int iduser);
    }
}
