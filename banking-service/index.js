/**
 * bankingSystem to handle accounts and provide withdraw and deposit functions
 * @returns withdraw function to withdraw the amount
 * @returns deposit function to deposit the amount
 */
function bankingSystem() {
    //dummy accounts
  const accounts = [
    {
      accountNo: "1001",
      cardNo: "1111222233334444",
      pin: "1234",
      balance: 5000,
    },
    {
      accountNo: "1002",
      cardNo: "5555666677778888",
      pin: "2345",
      balance: 7000,
    },
    {
      accountNo: "1003",
      cardNo: "9999000011112222",
      pin: "3456",
      balance: 10000,
    },
    {
      accountNo: "1004",
      cardNo: "3333444455556666",
      pin: "4567",
      balance: 15000,
    },
    {
      accountNo: "1005",
      cardNo: "7777888899990000",
      pin: "5678",
      balance: 20000,
    },
  ];

  /**
   *to check the cardNo and pin for a account
   * @param {*} cardNo
   * @param {*} pin
   * @returns account which have the cardNo and pin matched
   */
  const validateUser = (cardNo, pin) => {
    return accounts.find(
      (account) => account.cardNo === cardNo && account.pin === pin,
    );
  };

  return {
    /**
     * to withdraw the amount from the given account
     * @param  cardNo  of the withdrawer
     * @param {*} pin  of the withdrawer
     * @param {*} amount to be withdraw
     * @returns (void) print the summary of the last transaction
     */
    withdraw: (cardNo, pin, amount) => {
      const user = validateUser(cardNo, pin);
      if (!user) {
        console.log("Invalid card number or pin");
        return;
      }
      if (amount <= 0) {
        console.log("Amount should be greater than zero");
        return;
      }
      if (user.balance < amount) {
        console.log("Insufficient balance");
        return;
      }
      user.balance -= amount;
      console.log("Withdrawal completed!!!");
      console.log("Amount Withdrawn:", amount);
      console.log("Balance Amount", user.balance);
    },

    /**
     * to deposit the amount from the given account
     * @param  cardNo  of the depositor
     * @param {*} pin  of the depositor
     * @param {*} amount to be deposit
     * @returns(void) print the summary of the last transaction
     */
    deposit: (cardNo, pin, amount) => {
      const user = validateUser(cardNo, pin);
      if (!user) {
        console.log("Invalid Card number or pin.");
        return;
      }
      if (amount <= 0) {
        console.log("Amount should be more than zero.");
        return;
      }
      user.balance += amount;
      console.log("Deposit completed!!!");
      console.log("Amount Deposited: ", amount);
      console.log("Balance Amount", user.balance);
    },
  };
}

//calling the bankingSystem function
const simulatedATM = bankingSystem();
simulatedATM.withdraw;

//credentials check
simulatedATM.withdraw("1111222233334444", "1236", 11001);
// ATM Withdrawal
simulatedATM.withdraw("1111222233334444", "1234", 1000);
//ATM Deposit
simulatedATM.deposit("1111222233334444", "1234", 7000);
//ATM Balance check
simulatedATM.withdraw("1111222233334444", "1234", 11001);
//ATM Deposit check
simulatedATM.deposit("1111222233334444", "1234", 0);
