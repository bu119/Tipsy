package com.ssafy.coreweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;

import com.ssafy.coreweb.filter.JwtAuthorizationFilter;
import com.ssafy.coreweb.provider.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	private final JwtTokenProvider jwtTokenProvider;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		http.addFilterBefore(new JwtAuthorizationFilter(jwtTokenProvider), SecurityContextPersistenceFilter.class);
		http.csrf().disable(); //csrf��ū�˻縦 ��Ȱ��ȭ
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // ������ ������� ���� Stateless ������ ����
		.and()
		.formLogin().disable() //���α��� ��Ȱ��ȭ
		.httpBasic().disable()
		.authorizeRequests()
		.anyRequest().permitAll();
	}
	
    @Bean // �н����� ��ȣȭ ���� �޼ҵ�
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers("/images/**", "/js/**", "/webjars/**");
//    }
    
}
