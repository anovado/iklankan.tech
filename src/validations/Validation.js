// import React from 'react';

export const doValidataPhone = (phoneNumber) => {
  if (phoneNumber === "") {
    console.log("Nomor Hp atau password tidak boleh kosong!!");
    return false;
  } else {
    const pattern = /[0][8][0-9]{8,13}/;
    let res = pattern.exec(phoneNumber);
    if (res === null) {
      console.log("gunakan format 08xxxxxxxxxx");
      return false;
    } else {
      return true;
    }
  }
};

export const doValidateName = (name) => {
  if (name === "" || name === undefined) {
    console.log("Nama Tidak boleh kosong");
    return false;
  } else if (name.length < 4) {
    console.log("Panjang nama harus lebih besar dari 4");
    return false;
  } else {
    return true;
  }
};

export const doValidateEmail = (email) => {
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const res = pattern.exec(email);
  if (res !== null) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
};

export const doValidatePassword = (password) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  const res = pattern.exec(password);

  if (res !== null) {
    console.log(
      "Password harus minimal 8 digit, ada huruf kecil, besar dan angka"
    );
    return false;
  } else {
    return true;
  }
};

export const doCompare = (string1, string2) => {
  return string1 === string2 ? true : false;
};
