package com.ssafy.coreweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()// ������ ������� �ʰ� JWT ��ū�� Ȱ���Ͽ� ����, csrf��ū�˻縦 ��Ȱ��ȭ
                .authorizeRequests() // ���������� ���� ������ ����
                .antMatchers("/**").permitAll() // ������ url�� �������� �ʴ��� ������ ���� ����
                .anyRequest().authenticated();// �� ������ �� ������ �Ǿ�� ���ٰ���(ROLE�� �������)
        
//        http.headers().frameOptions().sameOrigin();
        
        return http.build();
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
