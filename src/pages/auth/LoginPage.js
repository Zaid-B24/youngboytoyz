import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const LoginWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const LogoSubtext = styled.p`
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #ccc;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &.error {
    border-color: rgba(239, 68, 68, 0.5);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    color: #fff;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 1rem;
  color: #ef4444;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #666;
  font-size: 0.9rem;

  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        if (result.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <Logo>
          <LogoText>YOUNG BOY TOYZ</LogoText>
          <LogoSubtext>Luxury Automotive Excellence</LogoSubtext>
        </Logo>

        <Title>Welcome Back</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={error ? "error" : ""}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={error ? "error" : ""}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          {error && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </SubmitButton>
        </Form>

        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </LoginCard>
    </LoginWrapper>
  );
};

export default LoginPage;
