package com.wonders.security.controller;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.nlia.omms.service.IImoManager;
import com.wonders.security.entity.User;
import com.wonders.security.repository.UserRepository;

@Controller
@RequestMapping("users")
public class UserController extends AbstractCrudController<User, Long> {

	@Inject
	private UserRepository userRepository;
	
	@Autowired
	private IImoManager imoManager;
	
//	@Autowired
//	ApplicationContext applicationContext;

	@Override
	protected MyRepository<User, Long> getRepository() {
		return userRepository;
	}
	
	@RequestMapping(value = "findByLoginName/{loginName}", method = RequestMethod.GET)
	protected @ResponseBody
	User findByLoginName(@PathVariable String loginName) {
		return userRepository.findByLoginName(loginName);
	}
	
	@RequestMapping(value = "isLoginNameExist", method = RequestMethod.GET)
	protected @ResponseBody
	String isLoginNameExist(@RequestParam String loginName,
			@RequestParam(required = false) long id){
		User user = null;
		if(id == 0){
			user = userRepository.findByLoginName(loginName);
		}else{
			user = userRepository.findByLoginNameAndIdNot(loginName, id);
		}
		if(user == null ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}
	
	@RequestMapping(value = "validateUser/{loginName}/{password}", method = RequestMethod.GET)
	protected @ResponseBody
	User validateUser(@PathVariable String loginName, @PathVariable String password){
		User user = null;
		user = userRepository.findByLoginName(loginName);
		if(user != null){
			Md5PasswordEncoder md5 = new Md5PasswordEncoder();
			String pwd = md5.encodePassword(password, null);
			if(pwd.equals(user.getPassword())){
				return user;
			}else {
				return null;
			}
		}else {
			return null;
		
		}
	}

	@Override
	protected @ResponseBody String add(@RequestBody User entity) {

		Map<String, String> map = new HashMap<>();
		map.put("uname", entity.getUsername());
		map.put("passwd", entity.getPassword());
		map.put("uaccount", entity.getLoginName());

		String imo_id = imoManager.addStaff(map);
		entity.setImoId(imo_id);
		getRepository().save(entity);
		return "{success: true}";
	}
	
	@Override
	protected @ResponseBody String update(@RequestBody User entity) {
		
		HashMap<String, String> map = new HashMap<>();
		map.put("uid", entity.getImoId());
		map.put("uname", entity.getUsername());
		map.put("passwd", entity.getPassword());
		
		imoManager.modifyStaff(map);
		getRepository().save(entity);
		return "{success: true}";
	}
	
	@Override
	protected @ResponseBody String delete(@PathVariable Long id) {
			
		imoManager.removeStaff((getRepository().findOne(id)).getImoId());
		getRepository().delete(id);
		return "{success: true}";
	}
}
