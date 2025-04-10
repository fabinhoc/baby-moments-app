// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  confirm: {
    title: 'Confirmation required',
    question: 'Are you sure you want this action?',
    cancel: 'Cancelar',
    ok: 'Yes',
  },
  validations: {
    required: 'This field is required',
    string: 'This field must not be a numeric value',
    number: 'This field must be numeric',
    email: 'This field must be a valid e-mail',
    minLength: {
      number: 'This field must be greater than {minLength}',
      string: 'This field must have at least {minLength} characters',
    },
    passwordConfirmation: 'Password and Password Confirmation does not match',
    date: 'Invalid date',
  },
  app: {
    layouts: {
      welcome: 'Welcome!',
    },
    components: {
      timelineForm: {
        title: 'Title',
        description: 'Description',
        save: 'Save',
        cancel: 'Cancel',
      },
      btnConfig: {
        labelSlider: 'Available space',
        doUpgrade: 'Upgrade!',
      },
      btnUser: {
        edit: 'Edit',
        signature: 'My signature',
        logout: 'Logout',
      },
      momentForm: {
        title: 'Title',
        description: 'Description',
        avatar: 'Image',
        save: 'Save',
        cancel: 'Cancel',
        theme: 'Theme',
        postion: 'Position',
        positionHint:
          'Add order of position in which the moment will be displayed on the timeline. Eg: 1,2,3,4...',
        momentDate: 'Date moment',
      },
      tableMoments: {
        title: 'Title',
        avatar: 'Avatar',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        description: 'Description',
        theme: 'Theme',
        actions: 'Actions',
        photo: 'Photo | Photos',
        video: 'Video | Videos',
        edit: 'Edit',
        remove: 'Remove',
        position: 'Position',
        deleteConfirmation:
          'This action will remove all photos/videos from that moment. Are you sure about that?',
        momentDate: 'Date moment',
        memoryUsed: 'Memory Usage',
      },
      formLogin: {
        email: 'Email',
        password: 'Password',
        login: 'Login',
      },
      formForgotPassword: {
        email: 'Email',
        reset: 'Reset',
      },
      formResetPassword: {
        password: 'Password',
        passwordConfirmation: 'Confirm Password',
        save: 'Save',
      },
      formUser: {
        name: 'Name',
        email: 'Email',
        save: 'Save',
        clear: 'Clear',
      },
      updatePasswordForm: {
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        passwordConfirmation: 'Confirm new Password',
        save: 'Save',
        clear: 'Clear',
      },
      fileDataUpload: {
        makeUpload: 'Upload your files',
        selectFiles: 'Click to select files',
        upload: 'Upload',
        removeAll: 'Remove all',
        totalSelected: 'Total selected:',
        file: 'file | files',
        addTitlePlaceholder: 'Add a title here.',
        size: 'Size',
        type: 'Type',
        name: 'Name',
        status: 'Status',
      },
      formRegister: {
        name: 'Name',
        email: 'Email',
        password: 'Password',
        passwordConfirmation: 'Confirm password',
        register: 'Create account',
      },
    },
    pages: {
      timeline: {
        edit: {
          title: 'Edit Timeline',
          goBack: 'Go back',
          moment: 'Moment | Moments',
        },
        new: {
          title: 'New Timeline',
          goBack: 'Go back',
        },
        list: {
          title: 'My timelines',
          remove: 'Remove',
          add: 'Add new',
          edit: 'Edit',
          addMoment: 'Add moments',
          deleteConfirmation:
            'This action will remove all photos/videos from that timeline. Are you sure about that?',
        },
        view: {},
      },
      moment: {
        edit: {
          title: 'Edit Moment',
          goBack: 'Go back',
        },
        new: {
          title: 'Add Moment',
          goBack: 'Go back',
        },
      },
      index: {},
      album: {
        save: {
          goBack: 'Go back',
          title: 'Photos/videos album',
          totalMemoryUsed: 'Total Memory Usage',
        },
      },
      login: {
        forgotPassword: 'Forgot your password?',
        createAccount: 'Create an account',
      },
      emailVerification: {
        title: 'Verify your email',
        message: 'We have sent you verification email {email}',
        checkIt: 'Please check it',
        notReceivedYet: "Didn't receive an email?",
        resend: 'Resend',
        gotoLogin: 'Go to login page',
      },
      verify: {
        backToLogin: 'Back to login page',
        responseOk: 'Email verified successfully! Please visit the login page again.',
      },
      errorNotFound: {
        message: 'Oops. Nothing here...',
        goHome: 'Go home',
      },
      forgotPassword: {
        title: 'Reset Password',
        message: 'Please, type your e-mail.',
        remember: 'Remember It?',
        signin: 'Sign in',
      },
      resetPasswordConfirmation: {
        title: 'Recouver your password',
        message: 'We have sent you a password recouver email. Please check it.',
        emailNotSent: "Didn't receive an email?",
        resend: 'Resend',
        backToLogin: 'Back to login',
      },
      resetPassword: {
        title: 'Create new password',
        message: 'Please, type your new password.',
        save: 'Save',
        remember: 'Remember It?',
        signin: 'Sign in',
        messageSuccess:
          'Password updated with success. You are been redirecting for login page in: ',
        seconds: '{seconds} second(s)',
      },
      user: {
        profile: {
          goBack: 'Go back',
          infoTitle: 'Personal information',
          updatePasswordTitle: 'Update your password',
          sigature: 'My signature',
          signatureInfo:
            "You are currently using the <span class='text-uppercase text-weight-bold'>{signature}</span> signature",
          history: 'History',
          adquiredSignature:
            "Purchased subscription <span class='text-uppercase text-weight-bold'>{signature}</span> of <span class='text-uppercase text-weight-bold'>{size}</span by <span class='text-uppercase text-weight-bold'>{price}</span>",
          labelSlider: 'Available space:',
          upgrade: 'Do upgrade',
          cancelSignature: 'Cancel your signature',
          accountTitle: 'My account',
          deleteAccountInfo:
            "If you choose to delete your account, all of your data and photos/videos will be <span class='text-uppercase text-weight-bold'>deleted</span> from our database. You will <span class='text-uppercase text-weight-bold'>no longer have access to the platform</span> and it will not be possible to <span class='text-uppercase text-weight-bold'>recover your data again</span>.",
          btnDelete: 'I AM AWARE, Delete my account',
          deleteConfirmation:
            'By validating this action all your photos/videos will be permanently deleted.',
        },
        register: {
          hasAnAccount: 'I already have an account',
        },
        removeAccount: {
          sentence1: 'What a shame you gave up on us :(',
          sentence2: "But don't worry, we will always be here to help you.",
          sentence3:
            'In accordance with LGPD regulations, all your personal data has been successfully removed.',
          btnBack: 'Back to home page',
        },
      },
    },
  },
};
