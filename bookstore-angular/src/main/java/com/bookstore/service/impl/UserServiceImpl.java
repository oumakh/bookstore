package com.bookstore.service.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.domain.User;
import com.bookstore.domain.security.Role;
import com.bookstore.domain.security.UserRole;
import com.bookstore.repository.RoleRepository;
import com.bookstore.repository.UserRepository;
import com.bookstore.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired 
	private UserRepository userRepository;
	
	@Autowired 
	private RoleRepository roleRepository;
	
	@Transactional
	public User createUser(User user, Set<UserRole> userRoles) {
		User localUser = userRepository.findByUsername(user.getUsername());
		
		if(localUser != null) {
			LOG.info("User with username {} already exists. Nothing will be done.", user.getUsername());
		} else {
			Set<UserRole> userRoles2 = new HashSet<UserRole>();
			for(UserRole ur : userRoles) {
				Role r = new Role();
				r = roleRepository.save(ur.getRole());
				userRoles2.add(new UserRole(ur.getUser(), r));
			}
			
			user.getUserRoles().addAll(userRoles2);
			localUser = userRepository.save(user);
		}
		return localUser;
	}
	
	@Override
	public User save(User user)  {
		return userRepository.save(user);
	}
	
	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}
	
	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
}
