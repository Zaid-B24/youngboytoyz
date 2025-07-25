import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck,
  UserX
} from 'lucide-react';
import AdminNav from '../../components/admin/AdminNav';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  padding-top: 80px;
`;

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
`;

const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff, #ccc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;

const PageSubtitle = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 1.2rem;
  margin-bottom: 0;
  font-weight: 300;
`;

const ControlsSection = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: rgba(255,255,255,0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.5);
  size: 20px;
`;

const FilterButton = styled.button`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  border: none;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(255, 68, 68, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UserCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    border-color: rgba(255,255,255,0.15);
  }
`;

const UserHeader = styled.div`
  background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff4444, #ff6b6b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(255, 68, 68, 0.3);
  position: relative;
  z-index: 1;
`;

const UserInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const UserName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
`;

const UserEmail = styled.div`
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserRole = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
`;

const UserContent = styled.div`
  padding: 2rem;
`;

const UserDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const UserDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
`;

const UserStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${props => {
    switch (props.status) {
      case 'active': return 'rgba(16, 185, 129, 0.15)';
      case 'pending': return 'rgba(245, 158, 11, 0.15)';
      case 'inactive': return 'rgba(239, 68, 68, 0.15)';
      case 'admin': return 'rgba(139, 92, 246, 0.15)';
      default: return 'rgba(107, 114, 128, 0.15)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'inactive': return '#ef4444';
      case 'admin': return '#8b5cf6';
      default: return '#6b7280';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'active': return 'rgba(16, 185, 129, 0.3)';
      case 'pending': return 'rgba(245, 158, 11, 0.3)';
      case 'inactive': return 'rgba(239, 68, 68, 0.3)';
      case 'admin': return 'rgba(139, 92, 246, 0.3)';
      default: return 'rgba(107, 114, 128, 0.3)';
    }
  }};
`;

const UserActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button`
  background: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid ${props => props.active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.active ? '#fff' : 'rgba(255,255,255,0.7)'};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  &:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-10'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 987-6543',
      role: 'admin',
      status: 'admin',
      joinDate: '2023-11-20',
      lastLogin: '2024-03-12'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 456-7890',
      role: 'customer',
      status: 'pending',
      joinDate: '2024-03-08',
      lastLogin: '2024-03-08'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 321-0987',
      role: 'customer',
      status: 'active',
      joinDate: '2024-02-28',
      lastLogin: '2024-03-11'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 654-3210',
      role: 'customer',
      status: 'inactive',
      joinDate: '2023-12-10',
      lastLogin: '2024-02-15'
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 789-0123',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-30',
      lastLogin: '2024-03-12'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <PageWrapper>
      <AdminNav />
      <PageContainer>
        <PageHeader>
          <PageTitle>User Management</PageTitle>
          <PageSubtitle>Manage user accounts, roles, and permissions</PageSubtitle>
        </PageHeader>

        <ControlsSection>
          <ControlsRow>
            <SearchContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            <FilterButton>
              <Filter size={20} />
              Filters
            </FilterButton>
            <AddButton>
              <Plus size={20} />
              Add New User
            </AddButton>
          </ControlsRow>
        </ControlsSection>

        <UsersGrid>
          {filteredUsers.map(user => (
            <UserCard key={user.id}>
              <UserHeader>
                <UserAvatar>
                  {getInitials(user.name)}
                </UserAvatar>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserEmail>
                    <Mail size={16} />
                    {user.email}
                  </UserEmail>
                  <UserRole>
                    <Shield size={16} />
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </UserRole>
                </UserInfo>
              </UserHeader>
              <UserContent>
                <UserStatus>
                  <StatusBadge status={user.status}>
                    {user.status === 'admin' ? 'Administrator' : user.status}
                  </StatusBadge>
                  {user.status === 'active' && <UserCheck size={16} color="#10b981" />}
                  {user.status === 'inactive' && <UserX size={16} color="#ef4444" />}
                </UserStatus>

                <UserDetails>
                  <UserDetail>
                    <Phone size={16} />
                    <span>{user.phone}</span>
                  </UserDetail>
                  <UserDetail>
                    <Calendar size={16} />
                    <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                  </UserDetail>
                  <UserDetail>
                    <Users size={16} />
                    <span>Last login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                  </UserDetail>
                  <UserDetail>
                    <Shield size={16} />
                    <span>{user.role === 'admin' ? 'Full Access' : 'Standard Access'}</span>
                  </UserDetail>
                </UserDetails>

                <UserActions>
                  <ActionButton title="View Profile">
                    <Eye size={18} />
                  </ActionButton>
                  <ActionButton title="Edit User">
                    <Edit size={18} />
                  </ActionButton>
                  <ActionButton title="Delete User">
                    <Trash2 size={18} />
                  </ActionButton>
                  <ActionButton title="More Options">
                    <MoreVertical size={18} />
                  </ActionButton>
                </UserActions>
              </UserContent>
            </UserCard>
          ))}
        </UsersGrid>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
            Previous
          </PageButton>
          <PageButton active={currentPage === 1} onClick={() => setCurrentPage(1)}>
            1
          </PageButton>
          <PageButton active={currentPage === 2} onClick={() => setCurrentPage(2)}>
            2
          </PageButton>
          <PageButton active={currentPage === 3} onClick={() => setCurrentPage(3)}>
            3
          </PageButton>
          <PageButton onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </PageButton>
        </Pagination>
      </PageContainer>
    </PageWrapper>
  );
};

export default UserManagement; 