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
      accountNo: "1001",
      cardNo: "7777888899990000",
      pin: "5678",
      balance: 20000,
    },
  ];

  /**
   * function to check the validity of the entered amount by the user
   * @param  amount is the amount to check validity
   * @returns boolean for the validation of the amount
   */
  function isAmountValid(amount) {
    if (isNaN(amount)) {
      alert("Amount is invalid");
      return false;
    }
    if (amount <= 0) {
      alert("Amount should be greater than zero");
      return false;
    }

    return true;
  }

  /**
   * to find the account by using cardNo
   * @param cardNo of the user to find
   * @returns account of the user
   */
  function findUser(cardNo) {
    return accounts.find((account) => account.cardNo === cardNo);
  }
  return {
    /**
     * to withdraw the amount from the given account
     * @param  cardNo  of the withdrawer
     * @param  pin  of the withdrawer
     * @param  amount to be withdraw
     * @returns (void) print the summary of the last transaction
     */
    withdraw: (cardNo, amountString) => {
      const user = findUser(cardNo);
      const amount = Number(amountString);
      if (!isAmountValid(amount)) {
        return;
      }
      if (user.balance < amount) {
        alert("Insufficient balance");
        return;
      }
      user.balance = Number((user.balance - amount).toFixed(2));
      alert(
        `Withdrawal completed!!!\n Amount Withdraw: ${amount}\n Balance Amount: ${user.balance}`,
      );
    },
    /**
     * to deposit the amount from the given account
     * @param  cardNo  of the depositor
     * @param  pin  of the depositor
     * @param  amount to be deposit
     * @returns(void) print the summary of the last transaction
     */
    deposit: (cardNo, amountString) => {
      const user = findUser(cardNo);
      const amount = Number(amountString);
      if (!isAmountValid(amount)) {
        return;
      }
      user.balance = Number((user.balance + amount).toFixed(2));
      alert(
        `Deposit completed!!!\n Amount Deposited: ${amount}\n Balance Amount: ${user.balance}`,
      );
    },
    /**
     * to find the account in which transaction going to happen
     * @param accountNo is the account number of the ongoing transaction
     * @returns account which is equal to the accountNo
     */
    findAccount: (accountNo) =>
      accounts.find((account) => account.accountNo === accountNo),
    /**
     * to check the cardNo and pin for a account
     * @param cardNo  of the user
     * @param  pin  of the user
     * @param accountNo of the user
     * @returns account which have the cardNo and pin matched
     */
    validateUser: (accountNo, cardNo, pin) =>
      accounts.find(
        (account) =>
          account.accountNo === accountNo &&
          account.cardNo === cardNo &&
          account.pin === pin,
      ),
  };
}
//implementation of banking-service
function startAtm() {
  //calling the bankingSystem function
  const simulatedBankingSystem = bankingSystem();
  let isExit = false;
  while (!isExit) {
    const accountNo = prompt("Enter the account No: ");
    const account = simulatedBankingSystem.findAccount(accountNo);
    if (account) {
      const choice = prompt(
        `Enter:
1 for withdraw
2 for Deposit
3 for exit`,
      );
      if (choice === "3") {
        return "Transaction completed";
      }
      if (!["1", "2", "3"].includes(choice)) {
        alert("Enter valid choice");
        continue;
      }
      const cardNo = prompt("Enter the card number");
      const pin = prompt("Enter the pin");
      if (simulatedBankingSystem.validateUser(accountNo, cardNo, pin)) {
        const amount = prompt("Enter the amount");
        switch (choice) {
          case "1":
            simulatedBankingSystem.withdraw(cardNo, amount);
            break;
          case "2":
            simulatedBankingSystem.deposit(cardNo, amount);
            break;
          default:
            alert("Enter valid choice");
        }
      } else {
        alert("Invalid account or credentials");
      }
    } else {
      alert("Invalid account number");
    }
  }
}
startAtm();
