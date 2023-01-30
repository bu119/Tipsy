package com.hanjan.hanjangame

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.hanjan.hanjangame.adapter.UserListAdapter
import com.hanjan.hanjangame.adapter.showGameListDialog
import com.hanjan.hanjangame.databinding.ActivityGameRoomBinding
import com.hanjan.hanjangame.dto.UserWithData

class GameRoomActivity : AppCompatActivity() {

    private lateinit var binding: ActivityGameRoomBinding
    val userList = listOf(
        UserWithData("", "사용자 1", true, false),
        UserWithData("", "사용자 2", false, false),
        UserWithData("", "사용자 3", false, true)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityGameRoomBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val roomNumber = intent.getStringExtra("roomNumber")
        binding.gameStartBtn.setOnClickListener {
            startActivity(Intent(this, GameListActivity::class.java))
        }
        binding.gameRoomListBtn.setOnClickListener {
            showGameListDialog(this)
        }
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        binding.recyclerView.adapter = UserListAdapter(userList)
        binding.recyclerView.suppressLayout(true)
    }
}