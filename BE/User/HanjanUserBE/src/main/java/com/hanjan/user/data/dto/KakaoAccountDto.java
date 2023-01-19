package com.hanjan.user.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class KakaoAccountDto {
	private String kakao_id;
	private String birth;
	private String gender;
	private String image;
}
