document.getElementById("changePasswordBtn").addEventListener("click", () => {
  Swal.fire({
    title: '<span style="font-size:22px; font-weight:700; color:#4A148C;">🔐 Change Password</span>',
    html: `
      <style>
          .password-container {
    position: relative;
    width: 100%;
  }

  .password-container input {
    width: 70%;
    padding: 10px 42px 10px 12px; /* space for eye icon */
    border: 2px solid #BA68C8;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.3s ease-in-out;
  }

  .password-container input:focus {
    border-color: #8E24AA;
    box-shadow: 0 0 8px rgba(142, 36, 170, 0.4);
    outline: none;
  }

  .password-container .show-password {
    position: absolute;
    right: 80px;
    top: 60%;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    cursor: pointer;
    color: #8E24AA;
    font-size: 16px;
    padding: 0;
  }

  .password-container .show-password:hover {
    color: #6A1B9A;
  }

        .swal2-input {
          border: 2px solid #BA68C8;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(186, 104, 200, 0.5);
          transition: all 0.3s ease-in-out;
        }
        .swal2-input:focus {
          border-color: #8E24AA;
          box-shadow: 0 0 8px rgba(142, 36, 170, 0.6);
        }
      </style>

      <div style="display:flex; flex-direction:column; gap:15px; margin-top:15px;">
        <div class="password-container">
          <input type="password" id="old_password" class="swal2-input" placeholder="Old Password">
          <button type="button" class="show-password" onclick="togglePassword('old_password', this)">
            <i class="fas fa-eye"></i>
          </button>
        </div>

        <div class="password-container">
          <input type="password" id="new_password" class="swal2-input" placeholder="New Password">
          <button type="button" class="show-password" onclick="togglePassword('new_password', this)">
            <i class="fas fa-eye"></i>
          </button>
        </div>

        <div class="password-container">
  <input type="password" id="confirm_password" class="swal2-input" placeholder="Confirm New Password">
  <button type="button" class="show-password" onclick="togglePassword('confirm_password', this)">
    <i class="fas fa-eye"></i>
  </button>
</div>


      </div>
    `,
    background: 'linear-gradient(135deg, #f3e5f5, #ede7f6)',
    showCancelButton: true,
    confirmButtonText: '<i class="fas fa-key"></i> Update Password',
    cancelButtonText: '<i class="fas fa-times"></i> Cancel',
    buttonsStyling: false,
    customClass: {
      popup: 'animated fadeInDown faster shadow-lg rounded-4',
      confirmButton: 'btn btn-gradient m-2 px-4 py-2 fw-bold',
      cancelButton: 'btn btn-danger m-2 px-4 py-2 fw-bold',
    },
    didOpen: () => {
      // Add gradient button style dynamically
      const style = document.createElement('style');
      style.innerHTML = `
        .btn-gradient {
          background: linear-gradient(135deg, #279608ff, #0c91a5f9);
          color: white;
          border-radius: 8px;
          border: none;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          color: white;
          background: linear-gradient(235deg, #c0cd06e1, #c506e7ff);
          transform: scale(1.03);
        }
      `;
      document.head.appendChild(style);
    },
    preConfirm: () => {
      const old_password = document.getElementById('old_password').value.trim();
      const new_password = document.getElementById('new_password').value.trim();
      const confirm_password = document.getElementById('confirm_password').value.trim();

      if (!old_password || !new_password || !confirm_password) {
        Swal.showValidationMessage('⚠️ All fields are required!');
        return false;
      }
      if (new_password !== confirm_password) {
        Swal.showValidationMessage('❌ New passwords do not match!');
        return false;
      }

      return { old_password, new_password, confirm_password };
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '⏳ Updating...',
        text: 'Please wait while we update your password.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const response = await fetch('/user/change_password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.value)
        });

        const data = await response.json();
        Swal.close();

        if (data.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: '🎉 Password Updated!',
            text: data.message,
            background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire('❌ Error', data.message, 'error');
        }
      } catch (error) {
        Swal.fire('🚫 Error', 'Something went wrong while updating password!', 'error');
        console.error(error);
      }
    }
  });
});

function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
