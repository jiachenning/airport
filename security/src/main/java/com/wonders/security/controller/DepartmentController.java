package com.wonders.security.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Department;
import com.wonders.security.repository.DepartmentRepository;

@Controller
@RequestMapping("depts")
public class DepartmentController extends AbstractCrudController<Department, Long> {

	@Inject
	private DepartmentRepository departmentRepository;

	@Override
	protected MyRepository<Department, Long> getRepository() {
		return departmentRepository;
	}

}
