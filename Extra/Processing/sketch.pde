size(512, 512);

textSize(width / 2);
textAlign(CENTER, CENTER);

for (int i = 0; i < 40; i++) {
  background(128);
  text(i, width / 2, height / 2);
  save("image" + nf(i, 2) + ".png");
}

