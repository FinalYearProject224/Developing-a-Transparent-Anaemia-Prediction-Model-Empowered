document.getElementById("editProfileBtn").addEventListener("click", () => {
  Swal.fire({
    title: '<span style="font-size:22px; font-weight:700; color:#4A148C;">✏️ Edit Your Profile</span>',
    html: `
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
        <input type="text" id="name" class="swal2-input"
               style="border:2px solid #8E24AA; border-radius:8px;"
               value="${window.userData.name}" placeholder="Full Name">
        <input type="email" id="email" class="swal2-input"
               style="border:2px solid #8E24AA; border-radius:8px;"
               value="${window.userData.email}" placeholder="Email">
        <input type="text" id="username" class="swal2-input"
               style="border:2px solid #8E24AA; border-radius:8px;"
               value="${window.userData.username}" placeholder="Username">
      </div>
    `,
    background: 'linear-gradient(135deg, #f3e5f5, #ede7f6)',
    showCancelButton: true,
    confirmButtonText: '<i class="fas fa-save"></i> Update',
    cancelButtonText: '<i class="fas fa-times"></i> Cancel',
    buttonsStyling: false,
    customClass: {
      popup: 'animated fadeInDown faster shadow-lg rounded-4',
      confirmButton: 'btn btn-success m-2 px-4 py-2 fw-bold',
      cancelButton: 'btn btn-danger m-2 px-4 py-2 fw-bold',
    },
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const username = document.getElementById('username').value.trim();

      if (!name || !email || !username) {
        Swal.showValidationMessage('⚠️ All fields are required!');
        return false;
      }

      return { name, email, username };
    },
    showClass: { popup: 'animate__animated animate__fadeInDown animate__faster' },
    hideClass: { popup: 'animate__animated animate__fadeOutUp animate__faster' }
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '⏳ Updating...',
        text: 'Please wait while we update your profile.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const response = await fetch('/user/edit_profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.value)
        });

        const data = await response.json();
        Swal.close(); // close loading

        if (data.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: '🎉 Profile Updated!',
            text: 'Your profile has been updated successfully.',
            showConfirmButton: false,
            timer: 2000,
            background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)',
          });

          // ✅ Update frontend dynamically without reload
          if (data.user_data) {
            window.userData = data.user_data;

            document.querySelector('strong[data-field="name"]').textContent = data.user_data.name;
            document.querySelector('strong[data-field="username"]').textContent = data.user_data.username;
            document.querySelector('strong[data-field="email"]').textContent = data.user_data.email;
          }

        } else {
          Swal.fire('❌ Error', data.message || 'Update failed', 'error');
        }
      } catch (error) {
        Swal.fire('🚫 Error', 'Something went wrong while updating!', 'error');
        console.error(error);
      }
    }
  });
});
