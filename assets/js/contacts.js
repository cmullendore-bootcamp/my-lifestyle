
class contacts_Contact {
    constructor(first, last) {
        this.Key = `${first}${last}`.toUpperCase();
        this.FirstName = first;
        this.LastName = last;
    }

    Key = "";
    FirstName = "";
    LastName = "";
    Phone = "";
    Address = "";
}

function AddContact(contact) {

    if (FindContacts(contact.Key, 1).length > 0) {
        for (i = 0; i < contacts_List.length; i++) {
            if (contacts_List[i].Key === contact.Key) {
                contacts_List[i] = contact;
                break;
            }
        }
    } else {
        contacts_List.push(contact);
    }
    
    SortContacts();
    SaveContacts();
}

function SortContacts() {
    contacts_List.sort(function (a, b) {
        return a.Key.localeCompare(b.Key);
    });
}

function SaveContacts() {
    localStorage.setItem("contacts_ContactList", JSON.stringify(contacts_List));
}

function LoadContacts() {
    var contactsJson = localStorage.getItem("contacts_ContactList");
    if (contactsJson) {
        contacts_List = JSON.parse(contactsJson);
    }
}

function FindContacts(key, maxReturned) {
    key = key.toUpperCase();
    var found = [];

    for (i = 0; i < contacts_List.length; i++) {
        if (found.length >= maxReturned) {
            break;
        }

        if (found.length > 0 || contacts_List[i].Key.startsWith(key)) {
            found.push(contacts_List[i]);
        }
    }

    return found;
}

var contacts_List = [];


function LoadTestData() {
    var contacts_c = new contacts_Contact("Chris", "Mullendore");
    contacts_c.FirstName = "Chris";
    contacts_c.LastName = "Mullendore";
    contacts_List.push(contacts_c);

    var contacts_d = new contacts_Contact("David", "Matthews");
    contacts_d.FirstName = "David";
    contacts_d.LastName = "Matthews";
    contacts_List.push(contacts_d);

    var contacts_e = new contacts_Contact("bob", "Williams");
    contacts_e.FirstName = "Bob";
    contacts_e.LastName = "Williams";
    contacts_List.push(contacts_e);

}

function RenderContacts(contacts) {

    var contactsUl = document.getElementById("contacts-list");

    contactsUl.innerHTML = "";

    for (i = 0; i < contacts.length; i++) {
        newLI = document.createElement("li");
        newLI.textContent = `${contacts[i].FirstName} ${contacts[i].LastName}`;
        newLI.setAttribute("data-contact-key", contacts[i].FirstName);
        contactsUl.appendChild(newLI);
    }
}

LoadContacts();

var contacts_detail = $("#contacts-detail" ).dialog({
    autoOpen: false,
    title: "Contact Details",
    height: 400,
    width: 350,
    modal: true,
    dialogClass: "no-close"
});

var contacts_edit = $("#contacts-edit" ).dialog({
    autoOpen: false,
    height: 400,
    width: 370,
    modal: true,
    dialogClass: "no-close"
});

$("#contacts-search").on("input", function(event) {
    RenderContacts(FindContacts(event.target.value, 5));
});

$("#contacts-create").on("click", function(item) {
    contacts_edit.dialog( "option", "title", "Create a new contact");

    $("#contacts-editFirstName").text("");
    $("#contacts-editLastName").text("");
    $("#contacts-editPhone").text("");
    $("#contacts-editAddress").text("");
    $("#contacts-savebtn").attr("data-contact-key", "");

    contacts_edit.dialog("open");
});

$("#contacts-editbtn").on("click", function(item) {
    contacts_detail.dialog("close");

    var currentContact  = FindContacts(item.target.getAttribute("data-contact-key"), 1)[0];

    $("#contacts-editFirstName").val(currentContact.FirstName);
    $("#contacts-editLastName").val(currentContact.LastName);
    $("#contacts-editPhone").val(currentContact.Phone);
    $("#contacts-editAddress").val(currentContact.Address);
    $("#contacts-savebtn").attr("data-contact-key", currentContact.Key);

    contacts_edit.dialog("open");
});

$("#contacts-list").on("click", "li", function(item) {
    
    contacts_edit.dialog( "option", "title", "Contact Details");

    var currentContact = FindContacts(item.target.getAttribute("data-contact-key"), 1)[0];

    $("#contacts-viewFirstName").text(currentContact.FirstName);
    $("#contacts-viewLastName").text(currentContact.LastName);
    $("#contacts-viewPhone").text(currentContact.Phone);
    $("#contacts-viewAddress").text(currentContact.Address);
    $("#contacts-editbtn").attr("data-contact-key", currentContact.Key);
    
    contacts_detail.dialog("open")
});

$("#contacts-savebtn").on("click", function(item) {
    contacts_edit.dialog("close");

    var currentContact = new contacts_Contact($("#contacts-editFirstName").val(), $("#contacts-editLastName").val());
    currentContact.Phone = $("#contacts-editPhone").val();
    currentContact.Address = $("#contacts-editAddress").val();

    AddContact(currentContact);
    SortContacts();
    SaveContacts();

    contacts_edit.dialog("close");
});

$(".btn-closedialog").on("click", function(event) {
    $(event.target.dataset.dialogid).dialog("close");
});