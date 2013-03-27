package com.wonders.security.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Dictionary;
import com.wonders.security.repository.DictionaryRepository;

@Controller
@RequestMapping("dictionary")
public class DictionaryController extends AbstractCrudController<Dictionary, Long> {

	@Inject
	private DictionaryRepository dictionaryRepository;

	@Override
	protected MyRepository<Dictionary, Long> getRepository() {
		return dictionaryRepository;
	}
	
	@RequestMapping(value = "findByParentId/{parentId}", method = RequestMethod.GET)
	protected @ResponseBody
	List<Dictionary> findByParentId(@PathVariable long parentId) {
		return dictionaryRepository.findByParentId(parentId);
	}
	
	@RequestMapping(value = "validateDictionaryCode", method = RequestMethod.GET)
	protected @ResponseBody
	String validateDictionaryCode(@RequestParam String code,
			@RequestParam(required = false) long id){
		List<Dictionary> list = new ArrayList<Dictionary>();
		if (id == 0){
			list = dictionaryRepository.validateDictionaryCode(code);
		}else{
			list = dictionaryRepository.validateDictionaryCode(code,id);
		}
		if(list.size() == 0 ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}

}
