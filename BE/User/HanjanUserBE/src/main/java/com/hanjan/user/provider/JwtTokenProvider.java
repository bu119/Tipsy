package com.hanjan.user.provider;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.hanjan.user.data.vo.UserVo;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
	@Value("${SECRET-KEY}")
    private String secretKey;

    // ��ū ��ȿ�ð� 30��
    private long tokenValidTime = 30 * 60 * 1000L;

    private final UserDetailsService userDetailsService;

    // ��ü �ʱ�ȭ, secretKey�� Base64�� ���ڵ��Ѵ�.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT ��ū ���� 
    public String createToken(UserVo userVo) {
        Claims claims = Jwts.claims().setSubject(Long.toString(userVo.getUid())); // JWT payload �� ����Ǵ� ��������, ���� ���⼭ user�� �ĺ��ϴ� ���� �ִ´�.
        List<String>roles = new ArrayList<>();
        roles.add(userVo.getName());
        roles.add(userVo.getNickname());
        roles.add(userVo.getBirth());
        claims.put("roles", roles); // ������ key / value ������ ����ȴ�.
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // ���� ����
                .setIssuedAt(now) // ��ū ���� �ð� ����
                .setExpiration(new Date(now.getTime() + tokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, secretKey)  // ����� ��ȣȭ �˰����
                // signature �� �� secret�� ����
                .compact();
    }

    // JWT ��ū���� ���� ���� ��ȸ
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // ��ū���� ȸ�� ���� ����
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Request�� Header���� token ���� �����ɴϴ�. "Authorization" : "TOKEN��'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // ��ū�� ��ȿ�� + �������� Ȯ��
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}