using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_coinAppNet.Migrations
{
    /// <inheritdoc />
    public partial class updatetables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "date",
                table: "Incomes",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "rate",
                table: "Holdings",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "Bills",
                newName: "State");

            migrationBuilder.AlterColumn<float>(
                name: "Value",
                table: "Holdings",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<float>(
                name: "Value",
                table: "Bills",
                type: "real",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Incomes",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "Holdings",
                newName: "rate");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Bills",
                newName: "state");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Holdings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "Bills",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float");
        }
    }
}
