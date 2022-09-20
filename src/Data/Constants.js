export const TITLE = 'Kuber'
export const FULL_TITLE = 'Kuber Group'
export const MINI_DESCRIPTION = 'Online Messaging Platform'

export const FORM = {
    label: {
        email: {
            title: 'Email',
            placeholder: 'Enter your email'
        },
        password: {
            title: 'Password',
            placeholder: 'Enter your password'
        },
        confPassword: {
            title: 'Confirm Password',
            placeholder: 'Confirm your password'
        },
    },
    login: {
        title: 'Log In'
    },
    signup: {
        title: 'Sign Up'
    },
    recovery: {
        title: 'Password Recovery',
        button: 'Reset Password'
    },
    noAccount: {
        title: "Don't have an account?",
        button: 'Sign Up',
        url: '/signup'
    },
    haveAccount: {
        title: "Already have an account?",
        knowPassword: 'Already know Password?',
        button: 'Log In',
        url: '/login'
    },
    resetPasswword: {
        title: 'Forgot Password?',
        url: '/forgot-password'
    },
    error: {
        login: 'Failed to Log In',
        signup: 'Failed to Sign Up',
        passwordNotMatch: 'Passwords do not match',
        reset: {
            failed: 'Failed to reset',
            success: 'Password reset e-mail has been sent to'
        }
    }
}