const fs = require('fs');
const path = require('path');

const files = [
  {
    src: 'C:\\Users\\dinesh\\.gemini\\antigravity-ide\\brain\\8dbc4106-a3b0-4292-aec3-921ec7853c8e\\tvs_apache_rtr_160_2v_1783670308720.png',
    dest: path.join(__dirname, 'public', 'assets', 'apache_160.png')
  },
  {
    src: 'C:\\Users\\dinesh\\.gemini\\antigravity-ide\\brain\\8dbc4106-a3b0-4292-aec3-921ec7853c8e\\tvs_apache_rtr_310_studio_1783670869434.png',
    dest: path.join(__dirname, 'public', 'assets', 'apache_310.png')
  },
  {
    src: 'C:\\Users\\dinesh\\.gemini\\antigravity-ide\\brain\\8dbc4106-a3b0-4292-aec3-921ec7853c8e\\tvs_iqube_dark_1783674649823.png',
    dest: path.join(__dirname, 'public', 'assets', 'iqube.png')
  },
  {
    src: 'C:\\Users\\dinesh\\.gemini\\antigravity-ide\\brain\\8dbc4106-a3b0-4292-aec3-921ec7853c8e\\tvs_x_dark_1783674680214.png',
    dest: path.join(__dirname, 'public', 'assets', 'tvs_x.png')
  },
  {
    src: 'C:\\Users\\dinesh\\.gemini\\antigravity-ide\\brain\\8dbc4106-a3b0-4292-aec3-921ec7853c8e\\tvs_iqube_st_dark_1783675033895.png',
    dest: path.join(__dirname, 'public', 'assets', 'iqube_st.png')
  }
];

files.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log('Successfully copied to:', file.dest);
  } catch (err) {
    console.error('Error copying file:', err);
  }
});
