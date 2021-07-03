$(document).ready(function () {
  //data array
  let data = [];

  //function for adding contacts to html
  function addContact(contact) {
    let newContactHtml = `
            <div class="contact" id=${contact.id}>
                <div class="name">
                    <div class="circle">${contact.firstName[0]}${contact.lastName[0]}</div>
                    <p>${contact.firstName} ${contact.lastName}</p>
                </div>
                <div class="number">
                    <p>${contact.number}</p>
                </div>
                <div class="email">
                    <p>${contact.email}</p>
                </div>
                <div class="delete">
                    <img src="./images/trash.svg" alt="teash">
                </div>
            </div>
        `;
    $(".contacts").append(newContactHtml);
    $(".contacts_container .contacts .contact .name .circle")
      .last()
      .css("background-color", `${contact.color}`);
  }
  //colors
  const colors = [
    "#f4a261",
    "#e76f51",
    "#2a9d8f",
    "#e9c46a",
    "#e63946",
    "#a8dadc",
    "#457b9d",
    "#1d3557",
    "#ffb703",
    "#fb8500",
    "#ef476f",
  ];

  //Get all contacts from data when page loads
  if (data.length > 0) {
    $(".contacts_container .contacts .empty").css("display", "none");
    for (let i = 0; i < data.length; i++) {
      addContact(data[i]);
    }
  }

  //add contact
  $("header .add_contact").click(function () {
    $(".dark-bg").css("display", "block");
    $(".add_contact_container").css("transform", "translateY(0%)");
  });

  $(".dark-bg").click(function () {
    $(".dark-bg").css("display", "none");
    $(".add_contact_container").css("transform", "translateY(-200%)");
    $(".add_contact_container form #first-name")[0].value = "";
    $(".add_contact_container form #last-name")[0].value = "";
    $(".add_contact_container form #tel-number")[0].value = "";
    $(".add_contact_container form #email")[0].value = "";
  });

  $(".add_contact_container form .submit").click(function (e) {
    let telNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    e.preventDefault();
    const firstName = $(".add_contact_container form #first-name")[0];
    const lastName = $(".add_contact_container form #last-name")[0];
    const number = $(".add_contact_container form #tel-number")[0];
    const email = $(".add_contact_container form #email")[0];
    let randomNumber = Math.floor(Math.random() * 11);

    if (
      firstName.value === "" ||
      lastName.value === "" ||
      number.value === "" ||
      email.value === ""
    ) {
      alert("Please Fill All Required Field");
    } else if (!telNumberRegex.test(number.value)) {
      alert("Please Enter A Valid Telephone Number");
    } else if (!emailRegex.test(email.value)) {
      alert("Please Enter A Valid Email Address");
    } else {
      $(".contacts_container .contacts .empty").css("display", "none");
      let contactData = {
        id: data[data.length - 1] ? data[data.length - 1].id + 1 : 1,
        firstName: firstName.value,
        lastName: lastName.value,
        number: number.value,
        email: email.value,
        color: colors[randomNumber],
      };

      data.push(contactData);

      addContact(contactData);
      $(".dark-bg").css("display", "none");
      $(".add_contact_container").css("transform", "translateY(-200%)");
      firstName.value = "";
      lastName.value = "";
      number.value = "";
      email.value = "";
    }
  });

  //delete contact
  $(document).on(
    "click",
    ".contacts_container .contacts .contact .delete",
    function (e) {
      let id = e.currentTarget.parentNode.id;
      let index = data.findIndex(function (contact) {
        return contact.id === id;
      });

      data.splice(index, 1);
      e.currentTarget.parentNode.remove();
    }
  );

  //searchbar
  $("header .search_bar input").on("input", function (e) {
    let input = e.target.value;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        $(`#${data[i].id}`).remove();
      }
      let conactArr = data.filter((contact) => {
        if (
          input.length <= contact.firstName.length &&
          input.toLowerCase() ===
            contact.firstName.toLowerCase().substring(0, input.length)
        ) {
          return contact;
        } else if (
          input.length <= contact.lastName.length &&
          input.toLowerCase() ===
            contact.lastName.toLowerCase().substring(0, input.length)
        ) {
          return contact;
        } else if (
          input.length <= contact.number.length &&
          input === contact.number.substring(0, input.length)
        ) {
          return contact;
        } else if (
          input.length <= contact.email.length &&
          input === contact.email.substring(0, input.length)
        ) {
          return contact;
        } else if (
          input.length <=
          contact.firstName.length + contact.lastName.length + 1
        ) {
          let fullName = `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}`;
          if (input.toLowerCase() === fullName.substring(0, input.length)) {
            return contact;
          }
        }
      });
      console.log(conactArr);
      for (let i = 0; i < conactArr.length; i++) {
        addContact(conactArr[i]);
      }
    }
  });
});
