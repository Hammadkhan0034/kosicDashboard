import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../components/services/api';
import './Login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();




  const handleLogin = async () => {
    setError('');
    setLoading(true);
    
  
    try {
      console.log('API calling...');
      const response = await loginUser({ email, password });
      const access = response?.access;
      const refresh = response?.refresh;

      if (access && refresh) {
        console.log('Refresh and Access Tokens are:', refresh, access);

        
        // Store tokens in localStorage
      localStorage.setItem('authToken', access);
      localStorage.setItem('refreshToken', refresh);
    
        console.log('Tokens successfully stored in localStorage:', {
          authToken: localStorage.getItem('authToken'),
          refreshToken: localStorage.getItem('refreshToken'),
        });

        navigate('/');
      } else {
        throw new Error('Tokens not found in response');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <main className="main-content .bg-info mt-0">
      <div class="page-header align-items-start min-vh-100 loginBg">
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-4 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form className="text-start">
                    <div className="input-group input-group-outline my-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && (
                      <div className="text-danger mb-3 text-center">{error}</div>
                    )}
                    <div className="form-check form-switch d-flex align-items-center mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        defaultChecked
                      />
                      <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn bg-gradient-dark w-100 my-4 mb-2"
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? 'Signing in...' : 'Sign in'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
