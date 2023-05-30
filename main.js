function save() {
  var id = document.getElementById('inputStaffId').value;
  var fullName = document.getElementById('inputStaffName').value;
  var username = document.getElementById('inputStaffUsername').value;
  var email = document.getElementById('inputStaffEmail').value;
  var phone = document.getElementById('inputStaffPhone').value;
  var role = document.getElementById('inputStaffRole').value;
  var age = document.getElementById('inputStaffAge').value;
  var jobDuration = document.getElementById('inputStaffJobDuration').value;

  var staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  if (fullName === "" || username === "" || email === "" || phone === "" || role === "" || age === "" || jobDuration === "") {
    alert("Please fill out the form");
    return;
  }
  if (id) {
    // Update existing staff
    staffList.forEach((staff) => {
      if (staff.id == id) {
        staff.fullName = fullName;
        staff.username = username;
        staff.email = email;
        staff.phone = phone;
        staff.role = role;
        staff.age = age;
        staff.jobDuration = jobDuration;
      }
    });
    document.getElementById('inputStaffId').value = '';
  } else {
    // Add new staff
    var staff = {
      id: staffList.length > 0 ? staffList[staffList.length - 1].id + 1 : 1,
      fullName: fullName,
      username: username,
      email: email,
      phone: phone,
      role: role,
      age: age,
      jobDuration: jobDuration,
    };
    staffList.push(staff);
  }

  localStorage.setItem('staffList', JSON.stringify(staffList));
  allData();
  clearData();
}

function allData() {
  var table = document.getElementById('table');
  table.innerHTML = '';

  var staffList = JSON.parse(localStorage.getItem('staffList')) || [];

  staffList.forEach(function (staff, index) {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${staff.fullName}</td>
        <td>${staff.username}</td>
        <td>${staff.email}</td>
        <td>${staff.phone}</td>
        <td>${staff.role}</td>
        <td>${staff.age}</td>
        <td>${staff.jobDuration}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="find(${staff.id})">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeData(${staff.id})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function removeData(id) {
  var staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  staffList = staffList.filter(function (staff) {
    return staff.id != id;
  });
  localStorage.setItem('staffList', JSON.stringify(staffList));
  allData();
}

function find(id) {
  var staffList = JSON.parse(localStorage.getItem('staffList')) || [];
  staffList.forEach(function (staff) {
    if (staff.id == id) {
      document.getElementById('inputStaffId').value = staff.id;
      document.getElementById('inputStaffName').value = staff.fullName;
      document.getElementById('inputStaffUsername').value = staff.username;
      document.getElementById('inputStaffEmail').value = staff.email;
      document.getElementById('inputStaffPhone').value = staff.phone;
      document.getElementById('inputStaffRole').value = staff.role;
      document.getElementById('inputStaffAge').value = staff.age;
      document.getElementById('inputStaffJobDuration').value = staff.jobDuration;
    }
  });
}

allData();
