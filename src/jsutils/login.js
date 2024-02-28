function checkLogin(){
  if (!localStorage.getItem('token')) {
    return false;
  } 
  return true;
}

function checkTelephone(telephone) {
	return /^1[3456789]\d{9}$/.test(telephone);
}


export {
  checkLogin, checkTelephone
}