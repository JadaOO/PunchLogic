import Seeds from "./seeds.js";

function processEmployeeSalary(data) {
  const { jobMeta, employeeData } = data;

  const jobMap = new Map(
    jobMeta.map((job) => [
      job.job,
      { rate: job.rate, benefitsRate: job.benefitsRate },
    ])
  );

  const calculateHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffInMilliseconds = endTime - startTime;
    return diffInMilliseconds / (1000 * 60 * 60);
  };

  return employeeData.map((employee) => {
    const { employee: employeeName, timePunch } = employee;

    const {
      totalAmount,
      totalBenefits,
      totalHours,
      regularHours,
      overtimeHours,
      doubletimeHours,
    } = timePunch.reduce(
      (acc, punch) => {
        const { job, start, end } = punch;
        const { rate, benefitsRate } = jobMap.get(job) || {
          rate: 0,
          benefitsRate: 0,
        };
        const hoursWorked = calculateHours(start, end);

        const remainingRegularHours = Math.max(40 - acc.totalHours, 0);
        const regular = Math.min(remainingRegularHours, hoursWorked);

        const remainingOvertimeHours = Math.max(
          48 - acc.totalHours - regular,
          0
        );
        const overtime = Math.min(
          remainingOvertimeHours,
          hoursWorked - regular
        );

        const doubletime = Math.max(hoursWorked - regular - overtime, 0);

        acc.regularHours += regular;
        acc.overtimeHours += overtime;
        acc.doubletimeHours += doubletime;

        acc.totalAmount +=
          regular * rate + overtime * rate * 1.5 + doubletime * rate * 2;

        acc.totalBenefits += hoursWorked * benefitsRate;

        acc.totalHours += hoursWorked;

        return acc;
      },
      {
        totalAmount: 0,
        totalBenefits: 0,
        totalHours: 0,
        regularHours: 0,
        overtimeHours: 0,
        doubletimeHours: 0,
      }
    );

    return {
      employee: employeeName,
      hoursWorked: totalHours.toFixed(2),
      regularHours: regularHours.toFixed(2),
      overtimeHours: overtimeHours.toFixed(2),
      doubletimeHours: doubletimeHours.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalBenefits: totalBenefits.toFixed(2),
    };
  });
}

const salaryData = processEmployeeSalary(Seeds);
console.log(salaryData);

export default salaryData;
